alter table "public"."emailUser" drop constraint "tempUser_pkey";

drop index if exists "public"."tempUser_pkey";

alter table "public"."emailUser" add column "user_id" uuid not null;

CREATE UNIQUE INDEX "emailUser_pkey" ON public."emailUser" USING btree (id, user_id);

CREATE UNIQUE INDEX "emailUser_user_id_key" ON public."emailUser" USING btree (user_id);

alter table "public"."emailUser" add constraint "emailUser_pkey" PRIMARY KEY using index "emailUser_pkey";

alter table "public"."emailUser" add constraint "emailUser_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."emailUser" validate constraint "emailUser_user_id_fkey";

alter table "public"."emailUser" add constraint "emailUser_user_id_key" UNIQUE using index "emailUser_user_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  INSERT INTO public."emailUser" (user_id, email)
  VALUES (NEW.id, NEW.email);

  RETURN NEW;
END;
$function$
;


