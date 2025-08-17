# Microsserviços com Node.js, RabbitMQ, Kong e AWS

Este projeto foi desenvolvido durante o curso de microsserviços da **Rocketseat** com o objetivo de colocar em prática conceitos de arquitetura de microsserviços.

## 🚀 Visão geral

O sistema é composto por dois microsserviços independentes:

- **Orders**: responsável por criar pedidos.
- **Invoices**: responsável por gerar notas fiscais a partir dos pedidos.

Cada microsserviço possui **seu próprio banco de dados**, reforçando o princípio de que microsserviços devem ser **independentemente implantáveis**.

A comunicação entre os serviços é feita de forma **assíncrona** através de um **broker de mensagens (RabbitMQ)**.  
O acesso externo aos microsserviços é feito através do **Kong API Gateway**, que centraliza e gerencia as requisições externas de forma segura e organizada.

---

## 🛠️ Como funciona

1. Um pedido é criado via requisição **POST** para o serviço de **Orders**.
2. O serviço de **Orders** salva o pedido no banco de dados.
3. Em seguida, o serviço de **Orders** envia uma mensagem para o **RabbitMQ**.
4. O serviço de **Invoices** consome a mensagem e processa os dados.
5. Todo o tráfego externo passa pelo **API Gateway (Kong)**, que roteia as requisições para o microsserviço correto.

---

## ☁️ Infraestrutura

- O **deploy do projeto foi feito usando containers na AWS**.
- A infraestrutura foi provisionada com **Infrastructure as Code (IaC)** utilizando **Pulumi**.

---

## 📊 Observabilidade

O sistema conta com integração de observabilidade.  
No **Grafana** é possível acompanhar o _tracing_ completo da criação de um pedido:

- Requisição no serviço de Orders
- Registro no banco de dados
- Processamento no serviço de Invoices

Essa abordagem facilita o **debug distribuído** e garante maior visibilidade do fluxo entre os microsserviços.

---

## 📌 Tecnologias utilizadas

- **Node.js**
- **RabbitMQ**
- **AWS (Fargate)**
- **Pulumi (IaC)**
- **Kong (API Gateway)**
- **Grafana (observabilidade e tracing)**

---

## 📖 Aprendizados principais

- Microsserviços devem ser **independentemente implantáveis**.
- A comunicação assíncrona ajuda a desacoplar os serviços.
- O uso de um **API Gateway** é essencial para organizar e centralizar o acesso externo.
- Observabilidade é fundamental para lidar com a **complexidade distribuída**.
- **IaC** facilita a reprodutibilidade da infraestrutura em qualquer ambiente.
