CREATE OR REPLACE FUNCTION public.do_matching(integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare
    utilisateurId int;
BEGIN
    /*
     1) On récupère l'utilisateur via son ID
     2) On cherche dans la table preference les utilisateurs qui ont les même préférences que notre user
     3) On insère une relation pour chaque utilisateur DIFFERENT trouvé dans matching
    */

    RAISE NOTICE 'Recherche des partenaires potentiels...';

    FOR utilisateurId IN
                select user_id from (select distinct user_id from "Like" l where preference in (select preference from "Like" l2 where user_id = $1) and user_id != $1) as truc
                	where
                	(user_id not in (select id_user_two from "Matching" m where id_user_one = $1))
                    and (user_id not in (select id_user_one from "Matching" m2 where id_user_two = $1))
    LOOP
        CASE WHEN (select sexuality_pref from app_user au where id = $1) != 'A'
                    and (select gender from app_user au2 where id = $1) != 'A'
                    and (select gender from app_user au3 where id = utilisateurId) = (select sexuality_pref from app_user au5 where id = $1)
                    and (select sexuality_pref from app_user au4 where id = utilisateurId) = (select gender from app_user au6 where id = $1)
                THEN INSERT INTO MATCHING VALUES ($1, utilisateurId, null, null);
             WHEN (select sexuality_pref from app_user au7 where id = $1) = 'A'
                    and (select gender from app_user au8 where id = $1) != 'A'
                    and (select sexuality_pref from app_user au9 where id = utilisateurId) = (select gender from app_user au14 where id = $1)
                THEN INSERT INTO MATCHING VALUES ($1, utilisateurId, null, null);
            WHEN (select sexuality_pref from app_user au10 where id = $1) = 'A'
                    and (select gender from app_user au11 where id = $1) != 'A'
                    and (select sexuality_pref from app_user au12 where id = utilisateurId) = (select gender from app_user au13 where id = $1)
                THEN INSERT INTO MATCHING VALUES ($1, utilisateurId, null, null);
            WHEN (select sexuality_pref from app_user au15 where id = $1) = 'A'
                    and (select gender from app_user au16 where id = $1) = 'A'
                    and (select sexuality_pref from app_user au17 where id = utilisateurId) = 'A'
                THEN INSERT INTO MATCHING VALUES ($1, utilisateurId, null, null);
            else
		END case;
                -- Ici pas de traitement, on est dans le cas où aucun utilisateur ne correspond à ses critères

    END LOOP;
    RAISE NOTICE 'Fin du matching.';
    RETURN 1;
END;
$function$
;
