import { Side, Top } from "@/lib/utils/barItems";
import Paraclinicos from "@/components/medical/Paraclinicos";
import Agenda from "@/components/dashboard/Agenda";
import { ComponentType } from "react";
import HistoriaClinica from "@/components/medical/HistoriaClinica";

export type SIDEBAR_ITEM = {
  name: Side;
  component: ComponentType | null;
  icon: string;
};

type NAVBAR_ITEM = {
  name: Top;
  href: string;
  icon: string;
};

export const useTopBarItems = () => {

  const sidebarItems: NAVBAR_ITEM[] = [
    {
      name: "PROUNAM y Guías Clínicas",
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