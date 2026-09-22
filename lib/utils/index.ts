import { Side, Top } from "@/lib/utils/barItems";
import Paraclinicos from "@/components/medical/Paraclinicos";
import Agenda from "@/components/dashboard/Agenda";
import { ComponentType } from "react";
import HistoriaClinica from "@/components/medical/historia/HistoriaClinica";
import { TeleTriage } from "@/components/dashboard/TeleTriage";
import { TeletriageImage } from "@/assets/images";

export type SIDEBAR_ITEM = {
  name: Side;
  component: ComponentType | null;
  icon: any;
};

type NAVBAR_ITEM = {
  name: Top;
  href: string;
  icon: string;
};

export const useTopBarItems = () => {

  const sidebarItems: NAVBAR_ITEM[] = [
    {
      name: "PRONAM y Guías Clínicas",
      href: "https://www.google.com/?hl=es",
      icon: "",
    }, {
      name: "Guía de teleconsulta",
      href: "https://www.google.com/?hl=es",
      icon: "",
    }, {
      name: "Guía de prescripción",
      href: "https://www.google.com/?hl=es",
      icon: "",
    }, {
      name: "Guía de Actividades Profesionales a Confiar",
      href: "https://www.google.com/?hl=es",
      icon: "",
    }, {
      name: "Más Recursos",
      href: "https://www.google.com/?hl=es",
      icon: "",
    }
  ];

  return sidebarItems;
};

export const useSideBarItems = () => {

  const sidebarItems: SIDEBAR_ITEM[] = [
    {
      name: "Paraclínicos",
      component: Paraclinicos,
      icon: "",
    }, {
      name: "Agenda",
      component: Agenda,
      icon: "",
    }, {
      name: "TeleTriage", // Before consult
      component: TeleTriage,
      icon: TeletriageImage,
    }, {
      name: "Lista de Cotejo APCs", // Check as pdf's
      component: null,
      icon: "",
    }, {
      name: "Historia Clinica",
      component: HistoriaClinica,
      icon: "",
    }, {
      name: 'Nota SOAP',
      component: null,
      icon: ""
    }
  ];

  return sidebarItems;
};


export const useExpedienteClinicoItems = () => {

  const sidebarItems: SIDEBAR_ITEM[] = [
    {
      name: "Historia Clinica",
      component: HistoriaClinica,
      icon: "",
    }, {
      name: 'Nota SOAP',
      component: null,
      icon: ""
    }
  ]

  return sidebarItems;
}