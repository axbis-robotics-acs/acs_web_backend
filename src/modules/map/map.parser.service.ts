// src/map-parser/map-parser.service.ts
import { Injectable } from '@nestjs/common';
import { Node } from './../entity/node_master/Node.entity';
import { CommonCriteria } from 'src/common/query/common.criteria';

@Injectable()
export class MapParserService {
  parseNodeEntities(
    mapText: string,
    mapUuid: number,
    criteria: CommonCriteria,
  ): Node[] {
    const lines = mapText.split('\n');
    const nodeEntities: Node[] = [];

    for (const line of lines) {
      const goalMatch = line.match(
        /^Cairn:\s+(GoalWithHeading|StandbyGoalWithHeading|DockLynx)\s+(-?\d+)\s+(-?\d+)\s+(-?\d+(?:\.\d+)?).*ICON\s+"([^"]+)"/,
      );
      if (goalMatch) {
        const [, , x, y, degree, iconName] = goalMatch;

        const node = new Node();
        node.node_id = iconName;
        node.node_nm = iconName;
        node.pos_x_val = x;
        node.pos_y_val = y;
        node.degree_val = degree;
        node.map_uuid = mapUuid;
        node.site_cd = criteria.site_cd;
        node.creator_by = criteria.creator_by;
        node.create_at = criteria.create_at;
        node.modifier_by = criteria.modifier_by;
        node.modify_at = criteria.modify_at;
        node.trans_tx = criteria.trans_tx;
        node.last_event_at = criteria.last_event_at;
        nodeEntities.push(node);
      }
    }

    return nodeEntities;
  }
}
