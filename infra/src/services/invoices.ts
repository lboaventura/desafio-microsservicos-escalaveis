import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import { cluster } from "../cluster";
import { invoicesDockerImage } from "../images/invoices";
import { rabbitMQAmqpListener } from "./rabbitmq";

export const invoicesService = new awsx.classic.ecs.FargateService(
  "invoices-fargate",
  {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
      container: {
        image: invoicesDockerImage.ref,
        cpu: 256,
        memory: 512,
        environment: [
          {
            name: "DATABASE_URL",
            value: "<value>",
          },
          {
            name: "BROKER_URL",
            value: pulumi.interpolate`amqp://<value>:<value>@${rabbitMQAmqpListener.endpoint.hostname}:${rabbitMQAmqpListener.endpoint.port}`,
          },
          {
            name: "OTEL_TRACES_EXPORTER",
            value: "otlp",
          },
          {
            name: "OTEL_EXPORTER_OTLP_ENDPOINT",
            value: "<value>",
          },
          {
            name: "OTEL_SERVICE_NAME",
            value: "invoices",
          },
          {
            name: "OTEL_NODE_ENABLED_INSTRUMENTATIONS",
            value: "http,fastify,pg,amqplib",
          },
          {
            name: "OTEL_EXPORTER_OTLP_HEADERS",
            value: "<value>",
          },
          {
            name: "OTEL_RESOURCE_ATTRIBUTES",
            value:
              "service.name=invoices,service.namespace=microservices,deployment.environment=production",
          },
          {
            name: "OTEL_NODE_RESOURCE_DETECTORS",
            value: "env,host,os",
          },
        ],
      },
    },
  }
);
