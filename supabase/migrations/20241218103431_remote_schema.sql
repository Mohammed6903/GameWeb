drop policy "Allow admin users to do anything on game_plays table" on "public"."game_plays";

drop policy "Allow normal users to view game_plays" on "public"."game_plays";

alter table "public"."game_plays" alter column "game_id" set not null;

alter table "public"."game_plays" disable row level security;

CREATE UNIQUE INDEX unique_game_date ON public.game_plays USING btree (game_id, play_date);

alter table "public"."game_plays" add constraint "unique_game_date" UNIQUE using index "unique_game_date";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_play_count(game_id_param integer, play_date_param date)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Update the play count by incrementing its value
  UPDATE public.game_plays
  SET play_count = play_count + 1
  WHERE game_id = game_id_param AND play_date = play_date_param;
  IF NOT FOUND THEN
    INSERT INTO public.game_plays (game_id, play_date, play_count) VALUES (game_id_param, play_date_param, 1);
  END IF;
END;
$function$
;


