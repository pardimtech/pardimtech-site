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
    // Formato internacional só com dígitos, ex.: "5562999999999". Vazio = botões do WhatsApp ocultos.
    whatsapp: "5562981554472",
    whatsappExibicao: "(62) 98155-4472",
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
    prazoResposta: "Resposta em até 1 dia útil",
  },

  links: {
    linkedin: "", // ex.: "https://www.linkedin.com/in/seu-perfil"
    exemploRelatorio: "", // URL do PDF de exemplo. Vazio = botão "Baixar exemplo (PDF)" oculto.
  },

  nav: [
    { href: "#metodo", label: "Como funciona" },
    { href: "#servicos", label: "Serviços" },
    { href: "#areas", label: "Áreas" },
    { href: "#sobre", label: "Quem conduz" },
    { href: "#perguntas", label: "Perguntas" },
  ],

  cabecalho: {
    cta: "Pedir conversa",
  },

  hero: {
    descritor: "Consultoria em infraestrutura e cloud · Goiânia → Brasil",
    titulo: "Saiba o que está travando sua infraestrutura antes de pagar pela mudança.",
    texto:
      "Diagnóstico, plano e retorno definidos por escrito, com o mesmo especialista do primeiro achado ao aceite. Para empresas que dependem de ERP, banco de dados e servidores para operar.",
    ctaPrincipal: "Pedir conversa de diagnóstico",
    ctaWhatsapp: "Falar no WhatsApp",
    microcopy: "Você descreve o cenário em poucas linhas e a Pardim retorna para combinar a conversa.",
    garantias: [
      { icone: "relogio", texto: "Resposta em até 1 dia útil" },
      { icone: "check", texto: "Conversa inicial sem custo" },
      { icone: "cadeado", texto: "Acesso mínimo e NDA" },
    ],
    painel: {
      titulo: "Mapa de achados",
      rotulo: "exemplo",
      achados: [
        { nivel: "alto", rotulo: "Alto", camada: "Banco de dados", texto: "Backups sem teste de restauração documentado" },
        { nivel: "medio", rotulo: "Médio", camada: "Aplicação", texto: "Memória da JVM abaixo da carga de pico" },
        { nivel: "medio", rotulo: "Médio", camada: "Rede", texto: "Regras de firewall sem revisão nem responsável" },
        { nivel: "baixo", rotulo: "Baixo", camada: "Cloud", texto: "Instâncias ligadas fora do horário de uso" },
      ],
      rodape: "Cada achado sai com risco, prioridade e recomendação.",
      legenda: "Exemplo ilustrativo. Não representa um cliente.",
    },
  },

  faixa: {
    numero: "+10",
    numeroTexto: ["anos em infraestrutura", "e arquitetura de soluções"],
    itens: [
      { icone: "nuvem", titulo: "Experiência em AWS, OCI e Azure", sub: "Ambientes on-premises, nuvem e híbridos" },
      { icone: "local", titulo: "Remoto em todo o Brasil", sub: "Presencial em Goiânia e região" },
    ],
  },

  sintomas: {
    rotulo: "Sintomas",
    titulo: "Algum destes já aconteceu na sua operação?",
    intro: "São sintomas. A causa quase sempre está em outra camada, e é por isso que voltam.",
    itens: [
      { titulo: "Trava às 10h e ninguém explica", texto: "O ERP fica lento no pico e cada equipe aponta para uma camada diferente." },
      { titulo: "A mesma queda volta", texto: "Reinicia, estabiliza, cai de novo. Cada correção dura até a próxima." },
      { titulo: "Mudança sem caminho de volta", texto: "Migração ou atualização marcada, sem janela definida nem plano de retorno." },
      { titulo: "Conta que só sobe", texto: "O custo de cloud ou de infraestrutura cresce e ninguém sabe o que sustenta o quê." },
      { titulo: "Tudo depende de uma pessoa", texto: "Só ela sabe como o ambiente funciona. Se sair de férias, ninguém mexe." },
    ],
  },

  metodo: {
    rotulo: "Método",
    titulo: "Primeiro o diagnóstico. Depois a mudança.",
    intro:
      "Mudar sem diagnóstico é trocar peças até o sintoma sumir. O assessment cruza aplicação, banco, servidores, rede e cloud com as evidências do seu ambiente e mostra o que está errado, quanto risco existe e por onde começar.",
    passos: [
      { titulo: "Evidência", texto: "Logs, métricas e configurações combinados na proposta. Nada além disso." },
      { titulo: "Achado", texto: "Cada problema com camada, causa provável e risco para a operação." },
      { titulo: "Prioridade", texto: "O que corrigir agora, o que planejar e o que pode esperar." },
    ],
    mapa: {
      titulo: "Relatório de assessment · mapa de achados",
      achados: [
        { id: "ACH-01", nivel: "alto", rotulo: "Alto", camada: "Banco de dados", achado: "Backup diário sem teste de restauração", recomendacao: "Restaurar em ambiente isolado e registrar o tempo real" },
        { id: "ACH-02", nivel: "alto", rotulo: "Alto", camada: "Servidores", achado: "Sistema operacional fora do ciclo de suporte", recomendacao: "Planejar atualização com janela e retorno" },
        { id: "ACH-03", nivel: "medio", rotulo: "Médio", camada: "Aplicação", achado: "Memória da JVM abaixo da carga de pico", recomendacao: "Ajustar heap a partir da medição do pico" },
        { id: "ACH-04", nivel: "baixo", rotulo: "Baixo", camada: "Cloud", achado: "Instâncias ligadas fora do horário de uso", recomendacao: "Agendar desligamento e revisar o tamanho" },
      ],
      legenda: "Exemplo ilustrativo do formato. Os achados reais saem das evidências do seu ambiente.",
    },
    chamada: "Quer um mapa assim do seu ambiente?",
  },

  resultados: {
    rotulo: "Resultados",
    titulo: "O que muda depois do diagnóstico",
    intro:
      "E o que você pode verificar antes de contratar: sem números de vitrine, só a experiência de quem executa e o formato do que você recebe.",
    beneficios: [
      { titulo: "Clareza para decidir", texto: "Você sabe o que corrigir primeiro e o que pode esperar." },
      { titulo: "Mudança sem susto", texto: "Toda mudança tem janela aprovada, plano de retorno e validação." },
      { titulo: "Custo explicado", texto: "Você entende o que sustenta cada linha da conta de infraestrutura." },
      { titulo: "Documentação que fica", texto: "O conhecimento sai da cabeça de uma pessoa e vai para o papel." },
    ],
    qualificacoes: {
      titulo: "Qualificações",
      itens: [
        "Mais de 10 anos em infraestrutura, arquitetura e liderança técnica",
        "Ambientes on-premises, híbridos e em AWS, OCI e Azure",
        "Atuação de ponta a ponta: do levantamento à operação",
        "Redes, segurança e conectividade entre ambientes",
        "Investigação de lentidão em ERP, banco de dados e servidores de aplicação",
      ],
    },
    relatorio: {
      titulo: "Veja um exemplo de relatório",
      texto:
        "Um relatório de assessment anonimizado, com sumário executivo, mapa de achados e recomendações. É o que você recebe no fim do primeiro degrau.",
      cta: "Baixar exemplo (PDF)",
    },
  },

  servicos: {
    rotulo: "Serviços",
    titulo: "Três degraus. Você começa pelo primeiro.",
    intro:
      "O assessment é a porta de entrada. O relatório é seu: pode virar um projeto com a Pardim, uma assessoria ou um plano que a sua equipe executa.",
    itens: [
      {
        id: "assessment",
        selo: "Comece aqui",
        degrau: "Degrau 1 · porta de entrada",
        nome: "Assessment de infraestrutura",
        resumo: "Diagnóstico pago, com começo, meio e fim, para saber o que está acontecendo antes de mudar.",
        meta: "Remoto · em geral 2 a 3 semanas · preço na proposta",
        entregas: [
          "Reunião de diagnóstico e coleta de contexto",
          "Análise das evidências acordadas",
          "Mapa de achados, riscos e prioridades",
          "Recomendações com próximos passos",
          "Relatório e reunião de devolutiva",
        ],
        foraDoEscopo: "implementação, monitoramento contínuo e correção irrestrita.",
        cta: "Pedir um assessment",
      },
      {
        id: "projeto",
        condicao: "Se o diagnóstico pedir",
        degrau: "Degrau 2",
        nome: "Projeto de implementação",
        resumo:
          "Escopo fechado para corrigir uma causa priorizada, migrar com controle, endurecer a segurança, automatizar ou ajustar desempenho.",
        entregas: [
          "Plano técnico, pré-requisitos e responsabilidades",
          "Execução por marcos",
          "GMUD a cada mudança em ambiente",
          "Evidências e validação pós-mudança",
          "Documentação e aceite formal",
        ],
        foraDoEscopo: "itens fora do plano sem solicitação formal de mudança.",
        cta: "Discutir um projeto",
      },
      {
        id: "assessoria",
        condicao: "Para manter o ganho",
        degrau: "Degrau 3",
        nome: "Assessoria agendada",
        resumo:
          "Acompanhamento recorrente depois do diagnóstico ou do projeto, com agenda e capacidade mensal definidas em contrato.",
        entregas: [
          "Reuniões técnicas agendadas",
          "Revisão de indicadores e riscos",
          "Pequenas intervenções previamente combinadas",
          "Relatório periódico do plano de melhoria",
        ],
        foraDoEscopo: "atendimento 24×7, NOC, plantão e suporte ilimitado.",
        cta: "Conversar sobre assessoria",
      },
    ],
  },

  areas: {
    rotulo: "Especialidades",
    titulo: "Áreas de atuação",
    intro:
      "Os três formatos valem para qualquer frente. O ponto de partida é o problema do seu ambiente, não a ferramenta.",
    itens: [
      {
        titulo: "Arquitetura e cloud",
        texto: "Desenho e revisão de ambientes em nuvem, dimensionados para a carga real.",
        tecnologias: ["AWS", "OCI", "Azure"],
      },
      {
        titulo: "Migração para a nuvem",
        texto: "Dependências mapeadas, janelas e retorno planejados, cutover e estabilização.",
        tecnologias: ["Windows e Linux", "Cutover"],
      },
      {
        titulo: "Servidores, redes e conectividade",
        texto: "Servidores, identidade, firewalls e integração entre local e nuvem.",
        tecnologias: ["Linux", "Windows Server", "AD", "VMware", "Hyper-V", "Proxmox", "VPN IPsec", "FortiGate", "Sophos"],
      },
      {
        titulo: "Bancos de dados e desempenho",
        texto: "Lentidão investigada cruzando aplicação, banco e infraestrutura.",
        tecnologias: ["Oracle", "SQL Server", "PostgreSQL", "MySQL e MariaDB"],
      },
      {
        titulo: "Backup e continuidade",
        texto: "Restauração testada e recuperação com RPO e RTO definidos.",
        tecnologias: ["Veeam", "RPO e RTO"],
      },
      {
        titulo: "DevOps e automação",
        texto: "Infraestrutura como código, containers e pipelines para tirar o trabalho manual.",
        tecnologias: ["Terraform", "Ansible", "Docker", "Kubernetes", "CI/CD"],
      },
      {
        titulo: "Custos de cloud",
        texto: "Leitura do consumo e oportunidades em recursos, arquitetura e licenças.",
        tecnologias: ["FinOps", "AWS · OCI · Azure"],
      },
      {
        titulo: "Infraestrutura para ERP",
        texto: "Especialização em ambientes Sankhya OM: servidor de aplicação, banco e jobs.",
        tecnologias: ["Sankhya OM", "WildFly e JVM"],
      },
    ],
    parceria: {
      destaque: "Atende clientes com ERP, software ou sistemas críticos?",
      texto: "A Pardim complementa a sua equipe na infraestrutura.",
      cta: "Conversar sobre parceria",
      assuntoEmail: "Parceria (site)",
    },
  },

  processo: {
    rotulo: "Processo",
    titulo: "Como uma entrega acontece",
    passos: [
      { titulo: "Conversa inicial", texto: "Entender o problema, o impacto e quem decide. Sem custo." },
      { titulo: "Proposta por escrito", texto: "Escopo, exclusões, premissas, critério de aceite, prazo e preço." },
      { titulo: "Coleta de evidências", texto: "Logs, métricas e acessos definidos na proposta. Nada além." },
      { titulo: "Execução controlada", texto: "GMUD, janela aprovada, plano de retorno e validação." },
      { titulo: "Evidência e aceite", texto: "Relatório, documentação e devolutiva. Termina com aceite formal." },
    ],
    limites: {
      titulo: "O que a Pardim não oferece",
      texto:
        "Dizer o que fica fora é parte do escopo. Se você precisa de algum destes itens, a Pardim avisa na primeira conversa e indica o caminho.",
      itens: ["NOC ou monitoramento 24×7", "Plantão emergencial", "Suporte ilimitado", "SLA de resposta imediata"],
    },
  },

  sobre: {
    rotulo: "Quem conduz",
    nome: "Joás Pardim Araújo",
    cargo: "Arquiteto de soluções e fundador da Pardim",
    foto: "", // caminho da foto em public/, ex.: "/assets/joas-pardim.webp". Vazio = seção só com texto.
    paragrafos: [
      "Trabalho há mais de dez anos com infraestrutura de TI, arquitetura de soluções e liderança técnica, em ambientes on-premises e em várias nuvens.",
      "Atuo de ponta a ponta: levantamento, desenho da solução, implantação, investigação de falhas, documentação e transição para a operação. Você fala comigo do primeiro achado ao aceite.",
    ],
    notas: ["Pós-graduado em Arquitetura de Soluções pela PUC Minas.", "Especialista em OCI e AWS."],
  },

  compromissos: {
    rotulo: "Garantias",
    titulo: "Compromissos por escrito",
    itens: [
      "A conversa inicial não tem custo nem compromisso.",
      "Escopo, exclusões, prazo e preço por escrito antes de começar.",
      "Acesso mínimo ao ambiente e NDA quando você pedir.",
      "Se o relatório não trouxer os entregáveis listados na proposta, a Pardim complementa sem custo adicional.",
    ],
    capacidade: {
      titulo: "Agenda com capacidade real",
      texto:
        "A Pardim atende um projeto de implementação e, no máximo, um assessment por vez. É o que garante que quem diagnostica também executa.",
      itens: ["Projeto de implementação · 1 por vez", "Assessment · até 1 em paralelo"],
      fecho: "Quanto antes a conversa, antes o seu diagnóstico entra na agenda.",
    },
  },

  perguntas: {
    rotulo: "Perguntas",
    titulo: "Perguntas frequentes",
    itens: [
      {
        p: "Quanto custa?",
        r: "Depende do escopo. O preço vem na proposta, por escrito, antes de qualquer trabalho começar. Sem hora aberta.",
      },
      {
        p: "Como começa um trabalho?",
        r: "Com uma conversa sem custo. Basta trazer o sintoma, desde quando acontece e o impacto na operação. Se fizer sentido seguir, a proposta costuma ser um assessment pago.",
      },
      {
        p: "Quanto tempo leva o assessment e o que eu recebo?",
        r: "A duração fica definida na proposta, em geral de 2 a 3 semanas, de forma remota. No fim você recebe o mapa de achados, as recomendações, o relatório e uma reunião de devolutiva.",
      },
      {
        p: "Vou ter que dar acesso total ao ambiente?",
        r: "Não. A proposta define o acesso mínimo, por quanto tempo e para quê. A Pardim assina NDA quando você pedir.",
      },
      {
        p: "Já tenho equipe ou fornecedor. Faz sentido?",
        r: "Sim. O assessment entrega um plano priorizado que a sua equipe ou o seu fornecedor pode executar. Contratar o projeto depois não é obrigatório.",
      },
      {
        p: "Minha empresa é pequena. Vale a pena?",
        r: "O escopo acompanha o tamanho do ambiente. Se o problema para a operação, vale diagnosticar.",
      },
      {
        p: "O atendimento remoto funciona? E fora de Goiânia?",
        r: "Para infraestrutura e cloud, sim: acesso controlado, reuniões agendadas e evidência registrada, em todo o Brasil. Visitas presenciais fora de Goiânia e região são combinadas antes e cobradas à parte.",
      },
      {
        p: "E se for uma emergência?",
        r: "A Pardim não faz plantão. Depois do incidente, uma análise de causa raiz ajuda a evitar que ele volte.",
      },
    ],
  },

  contatoSecao: {
    rotulo: "Contato",
    titulo: "Conte o que está acontecendo no seu ambiente",
    texto:
      "Em poucas linhas: o sintoma, desde quando acontece e qual o impacto. Respondo em até 1 dia útil e marco a conversa com você.",
    formulario: {
      ambientes: ["On-premises", "Cloud", "Híbrido", "Não sei dizer"],
      placeholder: "Sintoma, desde quando e impacto na operação",
      enviarEmail: "Enviar por e-mail",
      enviarWhatsapp: "Enviar pelo WhatsApp",
      microcopy:
        "O formulário só monta a mensagem no seu e-mail ou WhatsApp. Nada é enviado a servidores nem guardado neste site.",
    },
  },

  barraMobile: {
    principal: "Pedir conversa",
    whatsapp: "WhatsApp",
  },

  rodape: {
    privacidade: "Este site não usa cookies nem ferramentas de rastreamento.",
  },
};
