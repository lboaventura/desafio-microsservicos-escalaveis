import * as pulumi from "@pulumi/pulumi";
import { ordersService } from "./src/services/orders";
import { rabbitMQService } from "./src/services/rabbitmq";
import { appLoadBalancer } from "./src/load-balancer";

export const orderId = ordersService.service.id;
export const rabbitMQId = rabbitMQService.service.id;
export const rabbitMQAmdinUrl = pulumi.interpolate`http://${appLoadBalancer.listeners[0].endpoint.hostname}:15672`;
