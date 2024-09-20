'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { Product, Template, Layer } from '../interfaces';
import Link from "next/link";

export default function GenerateAd() {
  const [products, setProducts] = useState<Product[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [layers, setLayers] = useState<Layer[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  // Fetch Products and Templates from the Prisma DB
  useEffect(() => {
    async function fetchData() {
      const productResponse = await fetch('/api/products');
      const templateResponse = await fetch('/api/templates');
      const productsData = await productResponse.json();
      const templatesData = await templateResponse.json();
      setProducts(productsData);
      setTemplates(templatesData);
    }
    fetchData();
  }, []);

  // When a template is selected, fetch its description and layers
  useEffect(() => {
    async function fetchTemplateDetails() {
      if (selectedTemplate) {
        const response = await fetch(`/api/templates/${selectedTemplate}`);
        const templateData = await response.json();
        setTemplateDescription(templateData.description);
        setLayers(templateData.layers);
      }
    }
    fetchTemplateDetails();
  }, [selectedTemplate]);

  const handleGenerate = async () => {
    // Handle the messaging generation logic here
    console.log({
      selectedProduct,
      selectedTemplate,
      customMessage,
      layers
    });
  };

  return (
    <div className={styles.container}>
      <h1>Generate Ad</h1>

      {/* Product Dropdown */}
      <div>
        <label className={styles.labelClass}>Product:</label>
        <select
          value={selectedProduct}
          className={styles.selectClass}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Template Dropdown */}
      <div>
        <label className={styles.labelClass}>Template:</label>
        <select
          value={selectedTemplate}
          className={styles.selectClass}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          required
        >
          <option value="">Select a Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.templateId}
            </option>
          ))}
        </select>
      </div>

      {/* Display Template Description */}
      {templateDescription && <p>{templateDescription}</p>}

      {/* Display Layers */}
      {layers.length > 0 && (
        <div>
          <h3>Layers</h3>
          {layers.map((layer) => (
            <div key={layer.id} className={styles['layer-container']}>
              <p>
                <strong>{layer.layerId}</strong>: {layer.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Custom Messaging Textarea */}
      <div>
        <label className={styles.labelClass}>Custom Messaging:</label>
        <textarea
          value={customMessage}
          className={styles.textareaClass}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={5}
          placeholder="Enter your custom message here"
        ></textarea>
      </div>

      {/* Generate Messaging Button */}
      <button onClick={handleGenerate} className={styles.button}>
        Generate Messaging
      </button>

      {/* Back to Homepage Button */}
      <Link href="/" className={`${styles.button} ${styles.ctas} ${styles.backLink}`}>
        ← Back to Homepage
      </Link>
    </div>
  );
}
