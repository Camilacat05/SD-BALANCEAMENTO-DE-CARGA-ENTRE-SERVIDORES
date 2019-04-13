# SD-BALANCEAMENTO-DE-CARGA-ENTRE-SERVIDORES
•	Ideia Geral: Implementar um SD com balanceamento de carga do tipo dinâmico

• Rquisito Funcional do Sistema: Software de CONTA PALAVRAS. Deve ser um texto grande que requer alto processamento.

•	Recursos Físicos: Smartphone, computador 01, computador 02, computador 03.

•	Arquitetura: O smartphone é um cliente que está conectado ao computador 01 (middleware), que por sua vez está conectado a dois servidores (computador 02 e 03).

•	Modo de Demostração: O cliente requisita um serviço e o middleware encaminha a requisição a um dos servidores baseando-se na disponibilidade e no nível de consumo de CPU. O resultado é retornado para o cliente pelo middleware.

•	Comunicação: Os serviços nos servidores serão providos por uma interface RESTful 

•	Apresentação das Informações: Fazer a GUI apenas para o cliente (tela de entrada e reposta da requisição)
