using AngularJsAspNet.Contracts.Repositories;
using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System.Collections.Generic;

namespace AngularJsAspNet.Services
{
    public class LivroService : CRUDService<Livro>, ILivroService
    {
        private readonly ILivroRepository _livroRepository;

        public LivroService(ILivroRepository livroRepository) : base(livroRepository)
        {
            this._livroRepository = livroRepository;
        }
        
    }
}