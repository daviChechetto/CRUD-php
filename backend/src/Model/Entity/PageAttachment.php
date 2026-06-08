<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * PageAttachment Entity
 *
 * @property int $id
 * @property string|null $label
 * @property string|null $path
 * @property string|null $mime_type
 * @property int|null $size_bytes
 * @property int|null $sort_order
 * @property \Cake\I18n\DateTime $created
 * @property \Cake\I18n\DateTime $modified
 * @property int|null $modified_by
 * @property int $page_id
 * @property int $user_id
 * @property int $system_id
 * @property bool $ativo
 * @property string $token
 *
 * @property \App\Model\Entity\Page $page
 * @property \App\Model\Entity\User $user
 */
class PageAttachment extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array<string, bool>
     */
    protected array $_accessible = [
        'label' => true,
        'path' => true,
        'mime_type' => true,
        'size_bytes' => true,
        'sort_order' => true,
        'created' => true,
        'modified' => true,
        'modified_by' => true,
        'page_id' => true,
        'user_id' => true,
        'system_id' => true,
        'ativo' => true,
        'token' => true,
        'page' => true,
        'user' => true,
    ];

    /**
     * Fields that are excluded from JSON versions of the entity.
     *
     * @var array<string>
     */
    protected array $_hidden = [
        'token',
    ];
}
