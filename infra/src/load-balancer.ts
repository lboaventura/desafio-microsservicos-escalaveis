import * as awsx from "@pulumi/awsx";
import { cluster } from "./cluster";

export const appLoadBalancer = new awsx.classic.lb.ApplicationLoadBalancer(
  "microservices-alb",
  {
    securityGroups: cluster.securityGroups,
  }
);

export const netLoadBalancer = new awsx.classic.lb.NetworkLoadBalancer(
  "microservices-nlb",
  {
    subnets: cluster.vpc.publicSubnetIds,
  }
);
