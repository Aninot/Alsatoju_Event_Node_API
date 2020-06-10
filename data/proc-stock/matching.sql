CREATE OR REPLACE FUNCTION public.do_matching(id_ integer)
    RETURNS integer
    LANGUAGE plpgsql
AS
$function$
DECLARE
    utilisateurId int;
BEGIN
    -- 1) On récupère l'utilisateur via son ID
    -- 2) On cherche dans la table preference les utilisateurs qui ont les même préférences que notre user
    -- 3) On insère une relation pour chaque utilisateur DIFFERENT trouvé dans matching
    -- 4) TODO : Ajouté un filtre sur l'age de l'user pour qu'il rentre dans les targets.
    RAISE NOTICE 'Recherche des partenaires potentiels...';
    FOR utilisateurId IN (SELECT user_id
                          FROM (SELECT distinct user_id
                                FROM "Like" l
                                WHERE preference_id IN (SELECT preference_id FROM "Like" l2 WHERE user_id = id_)
                                  AND user_id != id_) AS truc
                          WHERE (user_id NOT IN (SELECT user_two_id FROM "Matching" m WHERE user_one_id = id_))
                            AND (user_id NOT IN (SELECT user_one_id FROM "Matching" m2 WHERE user_two_id = id_)))
        LOOP
            CASE WHEN (SELECT sexuality_pref FROM app_user WHERE id = id_) ILIKE '%Homosexuel%' AND
                      (SELECT gender FROM app_user au2 WHERE id = id_) ILIKE '%Homme%' AND
                      (SELECT sexuality_pref FROM app_user au3 WHERE id = utilisateurId) ILIKE '%Homosexuel%' AND
                      (SELECT gender FROM app_user au4 WHERE id = utilisateurId) ILIKE '%Homme%'
                THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                WHEN (SELECT sexuality_pref FROM app_user au5 WHERE id = id_) ILIKE 'Homosexuel'
                    AND (SELECT gender FROM app_user au6 WHERE id = id_) ILIKE '%Femme%'
                    AND (SELECT sexuality_pref FROM app_user au7 WHERE id = utilisateurId) ILIKE '%Homosexuel%'
                    AND
                     (SELECT gender FROM app_user WHERE id = utilisateurId) ILIKE '%Femme%' THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                WHEN (SELECT sexuality_pref FROM app_user WHERE id = id_) ILIKE 'Homosexuel'
                    AND (SELECT gender FROM app_user WHERE id = id_) ILIKE '%Non Binaire%'
                    AND (SELECT sexuality_pref FROM app_user WHERE id = utilisateurId) ILIKE '%Homosexuel%'
                    AND (SELECT gender FROM app_user WHERE id = utilisateurId) ILIKE
                        '%Non Binaire%' THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                WHEN (SELECT sexuality_pref FROM app_user WHERE id = id_) ILIKE '%Hétérosexuel%'
                    AND (SELECT gender FROM app_user WHERE id = id_) ILIKE '%Homme%'
                    AND (SELECT sexuality_pref FROM app_user WHERE id = utilisateurId) ILIKE '%Hétérosexuel%'
                    AND (SELECT gender FROM app_user WHERE id = utilisateurId) ILIKE '%Femme%'
                    THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                WHEN (SELECT sexuality_pref FROM app_user WHERE id = id_) ILIKE '%Hétérosexuel%'
                    AND (SELECT gender FROM app_user WHERE id = id_) ILIKE '%Femme%'
                    AND (SELECT sexuality_pref FROM app_user WHERE id = utilisateurId) ILIKE '%Hétérosexuel%'
                    AND (SELECT gender FROM app_user WHERE id = utilisateurId) ILIKE '%Homme%'
                    THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                WHEN (SELECT sexuality_pref FROM app_user WHERE id = id_) ILIKE '%Non Binaire%'
                    AND (SELECT sexuality_pref FROM app_user WHERE id = utilisateurId) ILIKE '%Non Binaire%'
                    THEN INSERT INTO "Matching" VALUES (default, null, null, id_, utilisateurId);
                ELSE
                    RAISE NOTICE 'else';
                    RAISE NOTICE '%', utilisateurId;
                END CASE;
        END LOOP;
    RAISE NOTICE 'Fin du matching.';
    RETURN 1;
END;
$function$
;