import { Side, Top } from "@/lib/utils";
import HistClinica from "@/components/medical/Histclinica";
import Paraclinicos from "@/components/medical/Paraclinicos";
import { ComponentType } from "react";


type SIDEBAR_ITEM = {
  name: Side;
  component: ComponentType;
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
      href: "/guides/clinica",
      icon: "",
    }, {
      name: "Guía de teleconsulta",
      href: "/guides/teleconsulta",
      icon: "",
    }, {
      name: "Guía de prescripción",
      href: "/guides/prescripcion",
      icon: "",
    }, {
      name: "Guía de Actividades Profesionales a Confiar",
      href: "/guides/actividades",
      icon: "",
    }, {
      name: "Más Recursos",
      href: "/guides/more-sources",
      icon: "",
    }
  ];

  return sidebarItems;
};

export const useSideBarItems = () => {

  const sidebarItems: SIDEBAR_ITEM[] = [
    {
      name: "Historia Clínica",
      component: HistClinica, 
      icon: "",
    }, {
      name: "Paraclínicos",
      component: Paraclinicos,
      icon: "",
    }
  ];

  return sidebarItems;
};