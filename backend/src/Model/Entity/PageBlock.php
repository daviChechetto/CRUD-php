<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * PageBlock Entity
 *
 * @property int $id
 * @property string $title
 * @property int $page_id
 * @property string $tipo
 * @property array $conteudo
 * @property int $sort_order
 * @property int $user_id
 * @property int|null $system_id
 * @property bool $ativo
 * @property \Cake\I18n\DateTime $created
 * @property \Cake\I18n\DateTime $modified
 * @property int|null $modified_by
 *
 * @property \App\Model\Entity\Page $page
 * @property \App\Model\Entity\User $user
 */
class PageBlock extends Entity
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
        'title' => true,
        'page_id' => true,
        'tipo' => true,
        'conteudo' => true,
        'sort_order' => true,
        'user_id' => true,
        'system_id' => true,
        'ativo' => true,
        'created' => true,
        'modified' => true,
        'modified_by' => true,
        'page' => true,
        'user' => true,
    ];
}
