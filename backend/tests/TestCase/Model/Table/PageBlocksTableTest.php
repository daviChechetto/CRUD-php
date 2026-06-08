<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PageBlocksTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PageBlocksTable Test Case
 */
class PageBlocksTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\PageBlocksTable
     */
    protected $PageBlocks;

    /**
     * Fixtures
     *
     * @var array<string>
     */
    protected array $fixtures = [
        'app.PageBlocks',
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
        $config = $this->getTableLocator()->exists('PageBlocks') ? [] : ['className' => PageBlocksTable::class];
        $this->PageBlocks = $this->getTableLocator()->get('PageBlocks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    protected function tearDown(): void
    {
        unset($this->PageBlocks);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     * @link \App\Model\Table\PageBlocksTable::validationDefault()
     */
    public function testValidationDefault(): void
    {
        $data = [
            'page_id' => 1,
            'type' => 'texto',
            'content' => ['texto' => 'Conteúdo do bloco'],
            'sort_order' => 1,
            'user_id' => 1,
            'ativo' => 1,
        ];

        $pageBlock = $this->PageBlocks->newEntity($data);
        $this->assertEmpty($pageBlock->getErrors());
    }

    /**
     * Test buildRules method
     *
     * @return void
     * @link \App\Model\Table\PageBlocksTable::buildRules()
     */
    public function testBuildRules(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
