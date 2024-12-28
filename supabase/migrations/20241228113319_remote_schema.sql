CREATE UNIQUE INDEX providers_url_key ON public.providers USING btree (url);

alter table "public"."providers" add constraint "providers_url_key" UNIQUE using index "providers_url_key";

create policy "Allow public to see favIcons"
on "public"."favIcon"
as permissive
for select
to public
using (true);



