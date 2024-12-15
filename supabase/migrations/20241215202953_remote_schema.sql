CREATE UNIQUE INDEX adsense_scripts_name_key ON public.adsense_scripts USING btree (name);

alter table "public"."adsense_scripts" add constraint "adsense_scripts_name_key" UNIQUE using index "adsense_scripts_name_key";


