export interface Layer {
  id: string;
  type: 'TEXT' | 'IMAGE';  // Assuming the layer type is restricted to 'TEXT' and 'IMAGE'
  description: string;
}