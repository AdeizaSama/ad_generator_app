export interface Layer {
  id: string;
  layerId: string;
  type: 'TEXT' | 'IMAGE';  // Assuming the layer type is restricted to 'TEXT' and 'IMAGE'
  description: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Template {
  id: string;
  templateId: string;
  name: string;
  description: string;
  layers: Layer[];
}