using AngularJsAspNet.Contracts.Repositories;
using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System.Collections.Generic;

namespace AngularJsAspNet.Services
{
    public class CRUDService<TEntity> : ServiceBase, ICRUDService<TEntity> where TEntity : class
    {
        private readonly IRepositoryBase<TEntity> _repository;

        public CRUDService(IRepositoryBase<TEntity> repository)
        {
            this._repository = repository;
        }

        public IEnumerable<TEntity> List(int currentPage, int maxSize, string sortColumn, string sort)
        {
            return this._repository.GetAll(currentPage, maxSize, sortColumn, sort);
        }

        public TEntity GetById(int id)
        {
            return this._repository.GetById(id);
        }

        public void Insert(TEntity autor)
        {
            this._repository.Insert(autor);
        }

        public void Update(TEntity autor)
        {
            this._repository.Update(autor);
        }

        public void Delete(TEntity autor)
        {
            this._repository.Delete(autor);
        }

        public int Total()
        {
            return this._repository.Total();
        }
    }
}