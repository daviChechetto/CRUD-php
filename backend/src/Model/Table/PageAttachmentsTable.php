<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * PageAttachments Model
 *
 * @property \App\Model\Table\PagesTable&\Cake\ORM\Association\BelongsTo $Pages
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 *
 * @method \App\Model\Entity\PageAttachment newEmptyEntity()
 * @method \App\Model\Entity\PageAttachment newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\PageAttachment> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\PageAttachment get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\PageAttachment findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\PageAttachment patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\PageAttachment> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\PageAttachment|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\PageAttachment saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\PageAttachment>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageAttachment>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageAttachment>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageAttachment> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageAttachment>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageAttachment>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\PageAttachment>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\PageAttachment> deleteManyOrFail(iterable $entities, array $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class PageAttachmentsTable extends Table
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

        $this->setTable('page_attachments');
        $this->setDisplayField('label');
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
            ->scalar('label')
            ->maxLength('label', 255)
            ->allowEmptyString('label');

        $validator
            ->scalar('path')
            ->allowEmptyString('path');

        $validator
            ->scalar('mime_type')
            ->maxLength('mime_type', 255)
            ->allowEmptyString('mime_type');

        $validator
            ->integer('size_bytes')
            ->allowEmptyString('size_bytes');

        $validator
            ->allowEmptyString('sort_order');

        $validator
            ->integer('modified_by')
            ->allowEmptyString('modified_by');

        $validator
            ->integer('page_id')
            ->notEmptyString('page_id');

        $validator
            ->integer('user_id')
            ->notEmptyString('user_id');

        $validator
            ->integer('system_id')
            ->requirePresence('system_id', 'create')
            ->notEmptyString('system_id');

        $validator
            ->boolean('ativo')
            ->requirePresence('ativo', 'create')
            ->notEmptyString('ativo');

        $validator
            ->scalar('token')
            ->maxLength('token', 32)
            ->requirePresence('token', 'create')
            ->notEmptyString('token')
            ->add('token', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

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
        $rules->add($rules->isUnique(['token']), ['errorField' => 'token']);
        $rules->add($rules->existsIn(['page_id'], 'Pages'), ['errorField' => 'page_id']);
        $rules->add($rules->existsIn(['user_id'], 'Users'), ['errorField' => 'user_id']);

        return $rules;
    }
}
