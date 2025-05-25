/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
const enviarRespostaAPI = async (tipo, interlocutorReconhecido = null) => {
  try {
    const res = await fetch("http://localhost:5000/api/nip/resposta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, interlocutorReconhecido }),
    });
    const data = await res.json();
    console.log("Resposta enviada com sucesso:", data);
  } catch (error) {
    console.error("Erro ao enviar resposta:", error);
  }
};

import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsExclamationCircle,
} from "react-icons/bs";
import ModalConfirmacaoContato from "../ModalAutenticacao/ModalConfirmacaoContato";

export default function RespostaNip() {
  const [resposta, setResposta] = useState(null);
  const [etapa, setEtapa] = useState("nip");
  const [showModal, setShowModal] = useState(false);
  const [fluxoFinal, setFluxoFinal] = useState(null); // 'positivo', 'interlocutorReconhecido', 'interlocutorNaoReconhecido'
  const [proximaEtapa, setProximaEtapa] = useState(null); // 'reconhecido' ou 'naoReconhecido'

  const handleResposta = (tipo) => {
    if (tipo === "naoReconhecida" && etapa === "nip") {
      setEtapa("interlocutor");
    } else if (etapa === "interlocutor") {
      setProximaEtapa(
        tipo === "reconhecida" ? "reconhecido" : "naoReconhecido"
      );
      setShowModal(true);
    } else {
      setResposta(tipo);
      enviarRespostaAPI("reconhecida");
      setFluxoFinal("positivo");
    }
  };

  const handleConfirmarModal = () => {
    setShowModal(false);
    if (proximaEtapa === "reconhecido") {
      enviarRespostaAPI("naoReconhecida", true);
      setFluxoFinal("interlocutorReconhecido");
    } else {
      enviarRespostaAPI("naoReconhecida", false);
      setFluxoFinal("interlocutorNaoReconhecido");
    }
  };

  if (fluxoFinal === "positivo") {
    return (
      <>
        <Alert variant="success" className="mt-3">
          <small>
            <BsCheckCircle className="me-2" />
            Abertura da NIP <strong>RECONHECIDA</strong> pelo usuário.
          </small>
        </Alert>
        <div className="d-flex align-items-center gap-2 mt-3 mb-5 border-top pt-3">
          <BsCheckCircleFill className="text-success" />
          <span className="fw-bold" style={{ color: "#505251" }}>
            Obrigado pela resposta!
          </span>
        </div>
      </>
    );
  }

  if (fluxoFinal === "interlocutorReconhecido") {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <small>
            <BsExclamationCircle className="me-2 text-danger" />
            Interlocutor <strong>RECONHECIDO</strong> e abertura da NIP{" "}
            <strong>NÃO RECONHECIDA</strong> pelo usuário.
          </small>
        </Alert>
        <div className="d-flex align-items-center gap-2 mt-3 mb-5 border-top pt-3">
          <BsCheckCircleFill className="text-success" />
          <span className="fw-bold" style={{ color: "#505251" }}>
            Obrigado pela resposta!
          </span>
        </div>
      </>
    );
  }

  if (fluxoFinal === "interlocutorNaoReconhecido") {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <small>
            <BsExclamationCircle className="me-2 text-danger" />
            Interlocutor <strong>NÃO RECONHECIDO</strong> e abertura da NIP{" "}
            <strong>NÃO RECONHECIDA</strong> pelo usuário.
          </small>
        </Alert>
        <div className="d-flex align-items-center gap-2 mt-3 mb-5 border-top pt-3">
          <BsCheckCircleFill className="text-success" />
          <span className="fw-bold" style={{ color: "#505251" }}>
            Obrigado pela resposta!
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="mt-4">
      <hr className="my-2" />
      <p className="text-gray-bold">
        {etapa === "nip" ? "Reconhece esta NIP?" : "Reconhece o interlocutor?"}
      </p>
      <div className="d-flex gap-2 mb-5 btns-responsivos">
        <Button
          variant="outline"
          className="btn-outline-azul px-4"
          onClick={() => handleResposta("naoReconhecida")}
        >
          {etapa === "nip" ? "Não reconheço" : "Não"}
        </Button>
        <Button
          variant="primary"
          className="btn-azul px-4"
          onClick={() => handleResposta("reconhecida")}
        >
          {etapa === "nip" ? "Sim, foi aberto por mim" : "Sim"}
        </Button>
      </div>

      <ModalConfirmacaoContato
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirmar={handleConfirmarModal}
      />
    </div>
  );
}
