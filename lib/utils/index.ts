import { Side, Top } from "@/lib/utils/barItems";
import { TeletriageImage } from "@/assets/images";

export type SIDEBAR_ITEM = {
  name: Side;
  url: string;
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

export const useMainItems = () => {

  const sidebarItems: SIDEBAR_ITEM[] = [
    {
      name: "Paraclínicos",
      url: '',
      icon: "",
    }, {
      name: "TeleTriage", // Before consult
      url: '',
      icon: TeletriageImage,
    }, {
      name: "Lista de Cotejo APCs", // Check as pdf's
      url: '',
      icon: "",
    }, {
      name: "Historia Clinica",
      url: 'historiaClinica',
      icon: '',
    }, {
      name: 'Nota SOAP',
      url: '',
      icon: ""
    }
  ];

  return sidebarItems;
};
