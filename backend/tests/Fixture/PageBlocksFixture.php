<?php
declare(strict_types=1);

namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * PageBlocksFixture
 */
class PageBlocksFixture extends TestFixture
{
    /**
     * Init method
     *
     * @return void
     */
    public function init(): void
    {
        $this->records = [
            [
                'id' => 1,
                'title' => 'Lorem ipsum dolor sit amet',
                'page_id' => 1,
                'tipo' => 'Lorem ipsum dolor sit amet',
                'conteudo' => '',
                'sort_order' => 1,
                'user_id' => 1,
                'system_id' => 1,
                'ativo' => 1,
                'created' => '2026-05-29 13:34:59',
                'modified' => '2026-05-29 13:34:59',
                'modified_by' => 1,
            ],
        ];
        parent::init();
    }
}
