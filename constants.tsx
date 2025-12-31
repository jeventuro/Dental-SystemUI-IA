
import { Service, ClinicConfig } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Implantes Dentales',
    price: 1200,
    description: 'Restauración permanente de piezas perdidas utilizando raíces de titanio de alta biocompatibilidad que devuelven la fuerza y estética natural.',
    isPromo: false
  },
  {
    id: '2',
    name: 'Prótesis Flexibles',
    price: 450,
    description: 'Soluciones removibles confortables y estéticas, fabricadas con materiales termoplásticos que se adaptan perfectamente a tu encía sin ganchos metálicos.',
    isPromo: true,
    promoPrice: 380
  },
  {
    id: '3',
    name: 'Prótesis Fijas',
    price: 600,
    description: 'Coronas y puentes de porcelana o zirconio diseñados para permanecer fijos en la boca, recuperando la funcionalidad masticatoria de por vida.',
    isPromo: false
  },
  {
    id: '4',
    name: 'Odontopediatría',
    price: 60,
    description: 'Atención especializada para niños en un ambiente lúdico, enfocada en la prevención y tratamiento temprano para asegurar sonrisas sanas desde la infancia.',
    isPromo: false
  },
  {
    id: '5',
    name: 'Carillas Dentales',
    price: 850,
    description: 'Láminas ultrafinas de porcelana o resina que se adhieren al frente del diente para corregir color, forma y posición con resultados altamente estéticos.',
    isPromo: true,
    promoPrice: 700
  },
  {
    id: '6',
    name: 'Estética Dental',
    price: 250,
    description: 'Tratamientos integrales de diseño de sonrisa que armonizan la forma, color y posición de los dientes con las facciones del rostro.',
    isPromo: false
  },
  {
    id: '7',
    name: 'Prótesis Totales',
    price: 900,
    description: 'Rehabilitación completa para pacientes que han perdido todas sus piezas dentales, devolviendo la capacidad de hablar, comer y sonreír con seguridad.',
    isPromo: false
  },
  {
    id: '8',
    name: 'Ortodoncia',
    price: 1500,
    description: 'Corrección de la alineación dental y problemas de mordida utilizando brackets metálicos, estéticos o alineadores invisibles de última generación.',
    isPromo: false
  },
  {
    id: '9',
    name: 'Endodoncia',
    price: 300,
    description: 'Tratamiento de conductos especializado para salvar dientes con infecciones profundas o traumas, eliminando el dolor y preservando la pieza natural.',
    isPromo: false
  }
];

export const INITIAL_CONFIG: ClinicConfig = {
  phone: '+51 987 654 321',
  emergency_phone: '+51 900 111 222',
  address: 'Sedes en Huaral y Comas',
  hours: 'Lun-Vie: 9:00 AM - 8:00 PM | Sáb: 9:00 AM - 2:00 PM',
  email: 'contacto@dentalpremium.pe',
  vision: 'Brindar atención odontológica de calidad con un enfoque integral, promoviendo la salud y bienestar dental de nuestros pacientes a través de tratamientos personalizados y tecnología avanzada. Nos comprometemos a crear un ambiente acogedor y seguro, donde cada paciente se sienta valorado y escuchado.',
  mision: 'Proporcionar soluciones odontológicas efectivas y accesibles, enfocándonos en la educación y prevención para garantizar sonrisas saludables y felices en nuestra comunidad.',
  valores: 'Nuestro objetivo principal es cuidar de tu salud buco dental, nos preocupa lo mismo que a ti: tu sonrisa, por ello cada día trabajamos mediante las técnicas más avanzadas en odontología mínimamente invasiva y conservadora para conseguir la sonrisa que siempre soñaste.',
  calidad: 'Partimos de la premisa que cada paciente es único, en consecuencia, tu caso es particular. Es por ello, que llevamos un estricto control para recuperar tu salud bucodental y lograr estéticamente la sonrisa de tus sueños.',
  locations: [
    { id: 'h1', name: 'Sede Huaral Centro', address: 'Calle Derecha 123, Huaral', phone: '01 246 7890', whatsapp: '51987654321' },
    { id: 'h2', name: 'Sede Huaral Norte', address: 'Av. Solar 456, Huaral', phone: '01 246 1122', whatsapp: '51987654321' },
    { id: 'c1', name: 'Sede Comas', address: 'Av. Túpac Amaru 7890, Comas, Lima', phone: '01 534 5566', whatsapp: '51987654321' }
  ]
};
