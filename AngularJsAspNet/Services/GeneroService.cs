using AngularJsAspNet.Contracts.Repositories;
using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System.Collections.Generic;

namespace AngularJsAspNet.Services
{
    public class GeneroService : CRUDService<Genero>, IGeneroService
    {
        private readonly IGeneroRepository _generoRepository;

        public GeneroService(IGeneroRepository generoRepository) : base(generoRepository)
        {
            this._generoRepository = generoRepository;
        }
        
    }
}