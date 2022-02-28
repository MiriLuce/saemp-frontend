import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Estudiantes',
    url: '/estudiantes',
    icon: 'icon-graduation',
    children: [
      {
        name: 'Inscripción',
        url: '/estudiantes/inscripcion',
        icon: 'icon-notebook'
      },
      {
        name: 'Matrícula',
        url: '/estudiantes/matricula',
        icon: 'icon-user-follow'
      },
      {
        name: 'Búsqueda',
        url: '/estudiantes/busqueda',
        icon: 'icon-people'
      }
    ]
  },
  {
    name: 'Planificación Inst.',
    url: '/planificacion-institucional',
    icon: 'icon-trophy',
    children: [
      {
        name: 'Año Escolar',
        url: '/planificacion-institucional/anhio-escolar',
        icon: 'icon-speedometer'
      },
      {
        name: 'Doc. del Estudiante',
        url: '/planificacion-institucional/documentos-estudiante',
        icon: 'icon-folder'
      },
      {
        name: 'Descuentos',
        url: '/planificacion-institucional/descuento',
        icon: 'icon-tag'
      }
    ]
  },
  {
    name: 'Tesorería',
    url: '/tesoreria',
    icon: 'icon-docs',
    children: [
      {
        name: 'Pago de Cuota',
        url: '/tesoreria/pago-cuotas',
        icon: 'icon-calendar'
      },
      {
        name: 'Cobranza',
        url: '/tesoreria/cobranza',
        icon: 'icon-wallet'
      },
      {
        name: 'Reporte',
        url: '/tesoreria/reporte',
        icon: 'icon-chart'
      }
    ]
  }
];
