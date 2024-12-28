alter table "public"."user_roles" add column "username" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    google_name text;
    is_google_signup boolean;
BEGIN
    -- Check if signup is done using Google by examining raw_app_meta_data
    is_google_signup := (NEW.raw_app_meta_data->>'provider' = 'google');

    IF is_google_signup THEN
        -- Extract name from raw_user_meta_data for Google signup
        google_name := NEW.raw_user_meta_data->>'name';
        
        -- Insert with username for Google signup
        INSERT INTO public.user_roles (user_id, role, email, username)
        VALUES (NEW.id, 'user', NEW.email, google_name);
    ELSE
        -- Insert without username for non-Google signup
        INSERT INTO public.user_roles (user_id, role, email)
        VALUES (NEW.id, 'user', NEW.email);
    END IF;

    RETURN NEW;
END;
$function$
;


