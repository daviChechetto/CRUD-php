<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PageAttachmentsTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PageAttachmentsTable Test Case
 */
class PageAttachmentsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\PageAttachmentsTable
     */
    protected $PageAttachments;

    /**
     * Fixtures
     *
     * @var array<string>
     */
    protected array $fixtures = [
        'app.PageAttachments',
        'app.Pages',
        'app.Users',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('PageAttachments') ? [] : ['className' => PageAttachmentsTable::class];
        $this->PageAttachments = $this->getTableLocator()->get('PageAttachments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    protected function tearDown(): void
    {
        unset($this->PageAttachments);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     * @link \App\Model\Table\PageAttachmentsTable::validationDefault()
     */
    public function testValidationDefault(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     * @link \App\Model\Table\PageAttachmentsTable::buildRules()
     */
    public function testBuildRules(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
