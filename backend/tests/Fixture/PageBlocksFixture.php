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
                'page_id' => 1,
                'type' => 'Lorem ipsum dolor sit amet',
                'content' => ['texto' => 'Lorem ipsum dolor sit amet'],
                'sort_order' => 1,
                'user_id' => 1,
                'system_id' => 1,
                'ativo' => 1,
                'created' => '2026-06-08 11:54:35',
                'modified' => '2026-06-08 11:54:35',
                'modified_by' => 1,
            ],
        ];
        parent::init();
    }
}
