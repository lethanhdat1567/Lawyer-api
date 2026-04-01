-- Normalize retired admin-only reputation reasons before shrinking the enum.
UPDATE `reputation_ledger`
SET `reason` = 'MOD_ADJUSTMENT'
WHERE `reason` IN ('ADMIN_BONUS', 'ADMIN_PENALTY');

ALTER TABLE `reputation_ledger`
MODIFY `reason` ENUM(
    'HUB_REPLY_HELPFUL',
    'BLOG_QUALITY',
    'BLOG_POST_LIKED',
    'BLOG_COMMENT_HELPFUL',
    'MOD_ADJUSTMENT'
) NOT NULL;
