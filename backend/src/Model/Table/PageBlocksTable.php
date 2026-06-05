<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * PageBlocks Model
 *
 * @property \App\Model\Table\PagesTable&\Cake\ORM\Association\BelongsTo $Pages
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 *
 * @method \App\Model\Entity\PageBlock newEmptyEntity()
 * @method \App\Model\Entity\PageBlock newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\PageBlock> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\PageBlock get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\PageBlock findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\PageBlock patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\PageBlock> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\PageBlock|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\PageBlock saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\PageBlock>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageBlock>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageBlock>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageBlock> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageBlock>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageBlock>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageBlock>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageBlock> deleteManyOrFail(iterable $entities, array $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class PageBlocksTable extends Table
{
    /**
     * Initialize method
     *
     * @param array<string, mixed> $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('page_blocks');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Pages', [
            'foreignKey' => 'page_id',
            'joinType' => 'INNER',
        ]);
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER',
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->scalar('title')
            ->maxLength('title', 255);
            // ->requirePresence('title', 'create')
            // ->notEmptyString('title');

        $validator
            ->integer('page_id')
            ->notEmptyString('page_id');

        $validator
            ->scalar('tipo')
            ->maxLength('tipo', 255)
            ->requirePresence('tipo', 'create')
            ->notEmptyString('tipo');

        $validator
            ->requirePresence('conteudo', 'create')
            ->add('conteudo', 'notEmpty', [
                'rule' => function ($value) {
                    if (is_array($value)) {
                        return !empty($value);
                    }
                    return is_string($value) && trim($value) !== '';
                },
                'message' => 'O conteúdo do bloco é obrigatório.',
            ]);

        $validator
            ->requirePresence('sort_order', 'create')
            ->notEmptyString('sort_order');

        $validator
            ->integer('user_id')
            ->notEmptyString('user_id');

        $validator
            ->integer('system_id')
            ->allowEmptyString('system_id');

        $validator
            ->boolean('ativo')
            ->notEmptyString('ativo');

        $validator
            ->integer('modified_by')
            ->allowEmptyString('modified_by');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules): RulesChecker
    {
        $rules->add($rules->existsIn(['page_id'], 'Pages'), ['errorField' => 'page_id']);
        $rules->add($rules->existsIn(['user_id'], 'Users'), ['errorField' => 'user_id']);

        return $rules;
    }
}
