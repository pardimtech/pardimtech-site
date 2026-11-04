// Fonte única de conteúdo da landing page.
// Edite textos, contatos e listas aqui; o build (scripts/build.mjs) gera o HTML estático.
// Campos vazios ("") fazem o bloco correspondente não ser renderizado.

export const siteData = {
  meta: {
    url: "https://pardimtech.com.br",
    lang: "pt-BR",
    title: "Pardim Tecnologia | Consultoria em infraestrutura e cloud em Goiânia",
    description:
      "Diagnóstico e evolução de infraestrutura on-premises, cloud e híbrida, com escopo claro, mudanças controladas e evidência de entrega. Atendimento remoto em todo o Brasil.",
    ogImage: "/assets/og-pardim.png",
    themeColor: "#F4F7F8",
  },

  empresa: {
    nome: "Pardim Tecnologia",
    razaoSocial: "Pardim Tecnologia e Consultoria Ltda.",
    descritor: "Consultoria em infraestrutura e cloud",
    cidade: "Goiânia",
    uf: "GO",
    cnpj: "", // opcional: preencha se quiser exibir no rodapé
  },

  contato: {
    email: "contato@pardimtech.com.br",
    // Formato internacional só com dígitos, ex.: "5562999999999". Vazio = botão oculto.
    whatsapp: "",
    whatsappMensagem:
      "Olá! Vim pelo site da Pardim Tecnologia e quero conversar sobre o meu ambiente.",
    assuntoEmail: "Conversa de diagnóstico (site)",
    corpoEmail: [
      "Empresa:",
      "Ambiente (on-premises, cloud ou híbrido):",
      "O que está acontecendo:",
      "Desde quando:",
      "Impacto no negócio:",
    ].join("\n"),
  },

  links: {
    linkedin: "", // ex.: "https://www.linkedin.com/in/seu-perfil"
  },

  nav: [
    { href: "#servicos", label: "Serviços" },
    { href: "#metodo", label: "Como funciona" },
    { href: "#sankhya", label: "Sankhya" },
    { href: "#sobre", label: "Quem conduz" },
    { href: "#perguntas", label: "Perguntas" },
  ],

  hero: {
    titulo: "Diagnóstico e evolução de infraestrutura, com escopo claro e evidência de entrega.",
    texto:
      "A Pardim Tecnologia é uma consultoria boutique para ambientes on‑premises, cloud e híbridos. Você fala direto com o especialista que diagnostica, planeja e executa, do primeiro achado ao aceite.",
    ctaPrincipal: "Agendar conversa de diagnóstico",
    ctaWhatsapp: "Falar no WhatsApp",
    alcance: "Atendimento remoto em todo o Brasil e presencial em Goiânia e região.",
    painel: {
      titulo: "Mapa de achados",
      legenda: "Exemplo ilustrativo do que um assessment entrega.",
      achados: [
        { nivel: "alto", rotulo: "Alto", camada: "Banco de dados", texto: "Backups sem teste de restauração documentado" },
        { nivel: "medio", rotulo: "Médio", camada: "Aplicação", texto: "Memória da JVM abaixo da carga de pico" },
        { nivel: "medio", rotulo: "Médio", camada: "Rede", texto: "Regras de firewall sem revisão nem responsável" },
        { nivel: "baixo", rotulo: "Baixo", camada: "Cloud", texto: "Instâncias ligadas fora do horário de uso" },
      ],
      rodape: "Cada achado sai com risco, prioridade e recomendação.",
    },
  },

  sintomas: {
    titulo: "Quando faz sentido conversar",
    itens: [
      {
        titulo: "Lentidão que ninguém explica",
        texto: "O sistema fica lento nos horários de pico e cada equipe aponta para uma camada diferente.",
      },
      {
        titulo: "Instabilidade recorrente",
        texto: "Quedas, reinícios e filas que voltam depois de cada correção paliativa.",
      },
      {
        titulo: "Mudança com risco",
        texto: "Migração, atualização ou ida para a nuvem sem plano de retorno nem janela definida.",
      },
      {
        titulo: "Custo sem clareza",
        texto: "A conta de infraestrutura ou de cloud cresce e ninguém sabe ao certo o que sustenta o quê.",
      },
    ],
  },

  servicos: {
    titulo: "Três formas de trabalhar",
    intro:
      "A maioria dos clientes começa pelo assessment. Ele pode levar a um projeto, a uma assessoria ou a um plano que a sua própria equipe executa.",
    itens: [
      {
        id: "assessment",
        nome: "Assessment de infraestrutura",
        resumo: "Diagnóstico pago, com começo, meio e fim, para quem precisa saber o que está acontecendo antes de mudar.",
        entregas: [
          "Reunião de diagnóstico e coleta de contexto",
          "Análise das evidências acordadas",
          "Mapa de achados, riscos e prioridades",
          "Recomendações com próximos passos",
          "Relatório e reunião de devolutiva",
        ],
        foraDoEscopo: "Implementação, monitoramento contínuo e correção irrestrita.",
        cta: "Pedir um assessment",
      },
      {
        id: "projeto",
        nome: "Projeto de implementação",
        resumo: "Escopo fechado para corrigir uma causa priorizada, migrar com controle, endurecer a segurança, automatizar ou ajustar desempenho.",
        entregas: [
          "Plano técnico, pré-requisitos e responsabilidades",
          "Execução por marcos",
          "GMUD a cada mudança em ambiente",
          "Evidências e validação pós-mudança",
          "Documentação e aceite formal",
        ],
        foraDoEscopo: "Itens não previstos passam por solicitação formal de mudança.",
        cta: "Discutir um projeto",
      },
      {
        id: "assessoria",
        nome: "Assessoria agendada",
        resumo: "Acompanhamento recorrente depois do diagnóstico ou do projeto, com agenda e capacidade mensal definidas em contrato.",
        entregas: [
          "Reuniões técnicas agendadas",
          "Revisão de indicadores e riscos",
          "Pequenas intervenções previamente combinadas",
          "Acompanhamento do plano de melhoria e relatório periódico",
        ],
        foraDoEscopo: "Atendimento 24×7, NOC, plantão e suporte ilimitado.",
        cta: "Conversar sobre assessoria",
      },
    ],
  },

  metodo: {
    titulo: "Como uma entrega acontece",
    passos: [
      { titulo: "Conversa inicial", texto: "Entender o problema, o impacto no negócio e quem decide. Sem compromisso." },
      { titulo: "Proposta por escrito", texto: "Escopo, exclusões, premissas, critérios de aceite, cronograma e preço antes de qualquer trabalho." },
      { titulo: "Coleta de evidências", texto: "Logs, métricas, configurações e acessos definidos na proposta. Nada além do combinado." },
      { titulo: "Execução controlada", texto: "Mudanças com GMUD, janela aprovada, plano de retorno e validação." },
      { titulo: "Evidência e aceite", texto: "Relatório, documentação e devolutiva. O trabalho termina com aceite formal." },
    ],
    limites: {
      titulo: "O que a Pardim não oferece",
      texto:
        "Para manter a qualidade, a agenda comporta poucos projetos ao mesmo tempo e não inclui:",
      itens: ["NOC ou monitoramento 24×7", "Plantão emergencial", "Suporte ilimitado", "SLA de resposta imediata"],
    },
  },

  sankhya: {
    titulo: "Infraestrutura para ambientes Sankhya",
    texto:
      "Em um ERP como o Sankhya OM, a lentidão raramente tem uma causa só. A Pardim investiga a infraestrutura que sustenta o sistema, cruzando servidor de aplicação, banco de dados, sistema operacional e rede para chegar à causa raiz.",
    itens: [
      "WildFly e JVM: memória, threads, coleta de lixo e conexões",
      "Bancos Oracle e SQL Server no contexto do ERP",
      "Servidores Linux e Windows Server",
      "Jobs, serviços, backup e restauração",
      "Migração para cloud e estabilização após a virada",
      "Análise de causa raiz (RCA) e GMUD",
    ],
    aviso:
      "Atuação exclusiva em infraestrutura: não inclui consultoria funcional, implantação de módulos nem parametrização fiscal. A Pardim não é parceira oficial da Sankhya; Sankhya é marca de seu respectivo titular.",
  },

  tecnologias: {
    titulo: "Tecnologias do dia a dia",
    grupos: [
      { nome: "Cloud", itens: ["AWS", "Oracle Cloud (OCI)", "Microsoft Azure"] },
      { nome: "Servidores e virtualização", itens: ["Linux", "Windows Server", "Active Directory", "VMware", "Hyper-V", "Proxmox"] },
      { nome: "Redes e segurança", itens: ["VPN IPsec", "FortiGate", "Sophos", "DNS", "Certificados TLS"] },
      { nome: "Bancos de dados", itens: ["Oracle", "SQL Server", "PostgreSQL", "MySQL e MariaDB"] },
      { nome: "Continuidade", itens: ["Backup e restauração", "Armazenamento em objeto", "DR com RPO e RTO"] },
      { nome: "Migração", itens: ["Rehost Windows e Linux", "Cutover", "Estabilização"] },
    ],
  },

  sobre: {
    titulo: "Quem conduz",
    nome: "Joás Pardim Araújo",
    cargo: "Arquiteto de soluções e fundador",
    paragrafos: [
      "Mais de dez anos em infraestrutura de TI, arquitetura de soluções e liderança técnica, em ambientes on‑premises e em várias nuvens.",
      "Atua de ponta a ponta: levantamento, desenho da solução, implantação, investigação de falhas, documentação e transição para a operação. Pós-graduando em Arquitetura de Soluções pela PUC Minas.",
    ],
    certificacoes: [
      "AWS Certified Solutions Architect – Associate",
      "AWS Certified Cloud Practitioner",
      "Oracle Cloud Infrastructure",
      "Microsoft Azure Fundamentals (AZ-900)",
      "Fortinet NSE 1 e NSE 2",
    ],
  },

  perguntas: {
    titulo: "Perguntas frequentes",
    itens: [
      {
        p: "A Pardim atende emergências ou plantão 24×7?",
        r: "Não. O trabalho é agendado e com escopo definido. Depois de um incidente, é possível contratar uma análise de causa raiz para evitar que ele se repita.",
      },
      {
        p: "Como começa um trabalho?",
        r: "Com uma conversa para entender o problema. Se fizer sentido seguir, a proposta costuma ser um assessment pago, que dá base para qualquer decisão seguinte.",
      },
      {
        p: "Vocês precisam de acesso total ao ambiente?",
        r: "Não. As evidências e os acessos necessários são definidos na proposta, com o mínimo para cumprir o escopo.",
      },
      {
        p: "Atendem fora de Goiânia?",
        r: "Sim, remotamente em todo o Brasil. Visitas presenciais fora de Goiânia e região são combinadas antes e cobradas à parte.",
      },
      {
        p: "Quanto custa?",
        r: "Depende do escopo. O preço é apresentado na proposta, por escrito, antes de qualquer trabalho começar.",
      },
      {
        p: "A Pardim faz consultoria funcional do Sankhya?",
        r: "Não. A atuação é na infraestrutura que sustenta o ERP: servidores, banco de dados, WildFly e JVM, desempenho e disponibilidade.",
      },
      {
        p: "Trabalham com parceiros?",
        r: "Quando a entrega exige capacidade ou competência complementar, um parceiro pode participar, com responsabilidade, confidencialidade e escopo definidos em contrato e com a sua ciência.",
      },
    ],
  },

  contatoSecao: {
    titulo: "Conte o que está acontecendo no seu ambiente",
    texto:
      "Em poucas linhas: o sintoma, desde quando acontece e qual o impacto. O e-mail já abre com esse roteiro preenchido.",
  },

  rodape: {
    privacidade: "Este site não usa cookies nem ferramentas de rastreamento.",
  },
};
