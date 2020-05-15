CREATE OR REPLACE FUNCTION public.do_matching(integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    utilisateurId int;
BEGIN
    
    -- 1) On récupère l'utilisateur via son ID
    -- 2) On cherche dans la table preference les utilisateurs qui ont les même préférences que notre user
    -- 3) On insère une relation pour chaque utilisateur DIFFERENT trouvé dans matching
    -- 4) TODO : Ajouté un filtre sur l'age de l'user pour qu'il rentre dans les targets.
    

    RAISE NOTICE 'Recherche des partenaires potentiels...';

    FOR utilisateurId IN
                SELECT user_id FROM (SELECT distinct user_id FROM "Like" l WHERE preference IN (SELECT preference FROM "Like" l2 WHERE user_id = $1) AND user_id != $1) AS truc
                	WHERE
                	(user_id NOT IN (SELECT user_two_id FROM "Matching" m WHERE user_one_id = $1))
                    AND (user_id NOT IN (SELECT user_one_id FROM "Matching" m2 WHERE user_two_id = $1))
    LOOP
        CASE WHEN (SELECT sexuality_pref FROM app_user au WHERE id = $1) != 'A'
                    AND (SELECT gender FROM app_user au2 WHERE id = $1) != 'A'
                    AND (SELECT gender FROM app_user au3 WHERE id = utilisateurId) = (SELECT sexuality_pref FROM app_user au5 WHERE id = $1)
                    AND (SELECT sexuality_pref FROM app_user au4 WHERE id = utilisateurId) = (SELECT gender FROM app_user au6 WHERE id = $1)
                THEN INSERT INTO "Matching" VALUES (default, null, null, $1, utilisateurId);
             WHEN (SELECT sexuality_pref FROM app_user au7 WHERE id = $1) != 'A'
                    AND (SELECT gender FROM app_user au8 WHERE id = $1) = 'A'
                    AND (SELECT sexuality_pref FROM app_user au9 WHERE id = $1) = (SELECT gender FROM app_user au14 WHERE id = utilisateurId)
                THEN INSERT INTO "Matching" VALUES (default, null, null, $1, utilisateurId);
            WHEN (SELECT sexuality_pref FROM app_user au10 WHERE id = $1) = 'A'
                    AND (SELECT gender FROM app_user au11 WHERE id = $1) != 'A'
                    AND (SELECT sexuality_pref FROM app_user au12 WHERE id = utilisateurId) = (SELECT gender FROM app_user au13 WHERE id = $1)
                THEN INSERT INTO "Matching" VALUES (default, null, null, $1, utilisateurId);
            WHEN (SELECT sexuality_pref FROM app_user au15 WHERE id = $1) = 'A'
                    AND (SELECT gender FROM app_user au16 WHERE id = $1) = 'A'
                    AND (SELECT sexuality_pref FROM app_user au17 WHERE id = utilisateurId) = 'A'
                THEN INSERT INTO "Matching" VALUES (default, null, null, $1, utilisateurId);
            ELSE
		END CASE;
                -- Ici pas de traitement, on est dans le cas où aucun utilisateur ne correspond à ses critères
    END LOOP;
    RAISE NOTICE 'Fin du matching.';
    RETURN 1;
END;
$function$
;
