alter table "public"."emailUser" drop constraint "emailUser_user_id_fkey";

alter table "public"."emailUser" drop constraint "emailUser_user_id_key";

alter table "public"."emailUser" drop constraint "emailUser_pkey";

drop index if exists "public"."emailUser_pkey";

drop index if exists "public"."emailUser_user_id_key";

create table "public"."game_plays" (
    "id" bigint generated always as identity not null,
    "game_id" integer not null,
    "user_id" uuid not null,
    "played_at" timestamp with time zone default now()
);


alter table "public"."emailUser" drop column "user_id";

alter table "public"."emailUser" alter column "first_name" drop not null;

alter table "public"."emailUser" alter column "last_name" drop not null;

alter table "public"."role_permissions" enable row level security;

alter table "public"."site_metadata" enable row level security;

alter table "public"."user_roles" add column "email" text not null;

CREATE UNIQUE INDEX game_plays_pkey ON public.game_plays USING btree (id);

CREATE UNIQUE INDEX user_roles_email_key ON public.user_roles USING btree (email);

alter table "public"."game_plays" add constraint "game_plays_pkey" PRIMARY KEY using index "game_plays_pkey";

alter table "public"."game_plays" add constraint "game_plays_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE not valid;

alter table "public"."game_plays" validate constraint "game_plays_game_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_email_key" UNIQUE using index "user_roles_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_single_row()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (SELECT COUNT(*) FROM public.ad_settings) >= 1 THEN
        RAISE EXCEPTION 'The ad_settings table can only have one row.';
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role, email)
  VALUES (NEW.id, 'user', NEW.email);

  RETURN NEW;
END;
$function$
;

grant delete on table "public"."game_plays" to "anon";

grant insert on table "public"."game_plays" to "anon";

grant references on table "public"."game_plays" to "anon";

grant select on table "public"."game_plays" to "anon";

grant trigger on table "public"."game_plays" to "anon";

grant truncate on table "public"."game_plays" to "anon";

grant update on table "public"."game_plays" to "anon";

grant delete on table "public"."game_plays" to "authenticated";

grant insert on table "public"."game_plays" to "authenticated";

grant references on table "public"."game_plays" to "authenticated";

grant select on table "public"."game_plays" to "authenticated";

grant trigger on table "public"."game_plays" to "authenticated";

grant truncate on table "public"."game_plays" to "authenticated";

grant update on table "public"."game_plays" to "authenticated";

grant delete on table "public"."game_plays" to "service_role";

grant insert on table "public"."game_plays" to "service_role";

grant references on table "public"."game_plays" to "service_role";

grant select on table "public"."game_plays" to "service_role";

grant trigger on table "public"."game_plays" to "service_role";

grant truncate on table "public"."game_plays" to "service_role";

grant update on table "public"."game_plays" to "service_role";

CREATE TRIGGER limit_ad_settings_row BEFORE INSERT ON public.ad_settings FOR EACH ROW EXECUTE FUNCTION enforce_single_row();


