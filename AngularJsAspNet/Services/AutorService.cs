using AngularJsAspNet.Contracts.Repositories;
using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System.Collections.Generic;

namespace AngularJsAspNet.Services
{
    public class AutorService : CRUDService<Autor>, IAutorService
    {
        private readonly IAutorRepository _autorRepository;

        public AutorService(IAutorRepository autorRepository) : base(autorRepository)
        {
            this._autorRepository = autorRepository;
        }
        
    }
}