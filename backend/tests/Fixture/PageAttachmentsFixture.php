<?php
declare(strict_types=1);

namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * PageAttachmentsFixture
 */
class PageAttachmentsFixture extends TestFixture
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
                'label' => 'Lorem ipsum dolor sit amet',
                'path' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
                'mime_type' => 'Lorem ipsum dolor sit amet',
                'size_bytes' => 1,
                'sort_order' => 1,
                'created' => '2026-06-08 11:52:22',
                'modified' => '2026-06-08 11:52:22',
                'modified_by' => 1,
                'page_id' => 1,
                'user_id' => 1,
                'system_id' => 1,
                'ativo' => 1,
                'token' => '',
            ],
        ];
        parent::init();
    }
}
