revoke delete on table "public"."user_roles" from "anon";

revoke insert on table "public"."user_roles" from "anon";

revoke references on table "public"."user_roles" from "anon";

revoke select on table "public"."user_roles" from "anon";

revoke trigger on table "public"."user_roles" from "anon";

revoke truncate on table "public"."user_roles" from "anon";

revoke update on table "public"."user_roles" from "anon";

revoke delete on table "public"."user_roles" from "authenticated";

revoke insert on table "public"."user_roles" from "authenticated";

revoke references on table "public"."user_roles" from "authenticated";

revoke trigger on table "public"."user_roles" from "authenticated";

revoke truncate on table "public"."user_roles" from "authenticated";

revoke update on table "public"."user_roles" from "authenticated";

alter table "public"."adsense_scripts" drop constraint "adsense_scripts_name_key";

drop index if exists "public"."adsense_scripts_name_key";

alter table "public"."adsense_scripts" drop column "description";

alter table "public"."adsense_scripts" add column "parsedElement" jsonb;

alter table "public"."adsense_scripts" alter column "element" set data type text using "element"::text;

alter table "public"."adsense_scripts" alter column "position" drop default;


