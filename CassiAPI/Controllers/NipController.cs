using Microsoft.AspNetCore.Mvc;

namespace CassiAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NipController : ControllerBase
    {
        [HttpPost("resposta")]
        public IActionResult PostResposta([FromBody] RespostaNipDto resposta)
        {
            Console.WriteLine($"Resposta recebida: {resposta.Tipo} - {resposta.InterlocutorReconhecido}");
            return Ok(new { status = "Recebido com sucesso!" });
        }
    }

    public class RespostaNipDto
    {
        public string Tipo { get; set; }
        public bool? InterlocutorReconhecido { get; set; }
    }
}
