CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Allow admin users to do everything on buckets"
on "storage"."buckets"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'admin'::app_role)))));


create policy "Allow admin users to do everything on all bucket objects"
on "storage"."objects"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'admin'::app_role)))));


create policy "Allow normal users to read thumbnail bucket"
on "storage"."objects"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'user'::app_role) AND ((storage.foldername(objects.name))[1] = 'gameThumbnails'::text)))));



