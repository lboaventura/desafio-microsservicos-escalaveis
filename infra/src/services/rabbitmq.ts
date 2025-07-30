import * as awsx from "@pulumi/awsx";
import { cluster } from "../cluster";
import { appLoadBalancer, netLoadBalancer } from "../load-balancer";

const rabbitMQAdminTargetGroup = appLoadBalancer.createTargetGroup(
  "rabbitmq-admin-target",
  {
    port: 15672,
    protocol: "HTTP",
    healthCheck: {
      path: "/",
      protocol: "HTTP",
    },
  }
);

export const rabbitMQAdminListener = appLoadBalancer.createListener(
  "rabbitmq-admin-listener",
  {
    port: 15672,
    protocol: "HTTP",
    targetGroup: rabbitMQAdminTargetGroup,
  }
);

const rabbitMQAmqpTargetGroup = netLoadBalancer.createTargetGroup(
  "rabbitmq-amqp-target",
  {
    port: 5672,
    protocol: "TCP",
    targetType: "ip",
    healthCheck: {
      protocol: "TCP",
      port: "5672",
    },
  }
);

export const rabbitMQAmqpListener = netLoadBalancer.createListener(
  "rabbitmq-amqp-listener",
  {
    port: 5672,
    protocol: "TCP",
    targetGroup: rabbitMQAmqpTargetGroup,
  }
);

export const rabbitMQService = new awsx.classic.ecs.FargateService(
  "rabbitmq-fargate",
  {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
      container: {
        image: "rabbitmq:3-management",
        cpu: 256,
        memory: 512,
        portMappings: [rabbitMQAdminListener, rabbitMQAmqpListener],
        environment: [
          { name: "RABBITMQ_DEFAULT_USER", value: "<value>" },
          { name: "RABBITMQ_DEFAULT_PASS", value: "<value>" },
        ],
      },
    },
  }
);
