export interface Spell {
    "name":string;
    "level":string;
    "casting_time":string;
    "range_area":string;
    "components": string[];
    "duration": string;
    "school": string;
    "attack_save": string;
    "damage_effect": string;
    "description": string[];
    "tags": string[];
    "classes": string[];
    "sourcebook": string;
    "banned": boolean;
    "concentration": boolean;
    "ritual": boolean;
    "materials": string;
}