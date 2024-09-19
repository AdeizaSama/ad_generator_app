'use client';

import { useState } from 'react';
import { Layer } from "@/app/interfaces";
import styles from '../page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function AddTemplate() {
  const [templateId, setTemplateId] = useState('');
  const [description, setDescription] = useState('');
  const [layers, setLayers] = useState([{ id: '', type: 'TEXT', description: '' }]);

  const addLayer = () => {
    setLayers([...layers, { id: '', type: 'TEXT', description: '' }]);
  };

  const deleteLayer = (index: number) => {
    setLayers(layers.filter((_, i) => i !== index));
  };

  const handleLayerChange = (index: number, key: keyof Layer, value: string): void => {
    const updatedLayers: { description: string; id: string; type: string }[] = layers.map((layer, i) =>
      i === index ? { ...layer, [key]: value } : layer
    );
    setLayers(updatedLayers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/addTemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ templateId, description, layers }),
    });

    if (response.ok) {
      toast.success('Template added successfully');
      setTemplateId('');
      setDescription('');
      setLayers([{ id: '', type: 'TEXT', description: '' }]);
    } else {
      // Handle error
      toast.error('Error adding template');
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1>Register a Template</h1>
      <form onSubmit={handleSubmit} className={styles.formClass}>
        <div>
          <label className={styles.labelClass}>Template ID:</label>
          <input
            type="text"
            className={styles.inputClass}
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.labelClass}>Template Format Description:</label>
          <input
            type="text"
            className={styles.inputClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Layers</h3>
          {layers.map((layer, index) => (
            <div key={index} className={styles['layer-container']}>
              <div>
                <label className={styles.labelClass}>ID:</label>
                <input
                  type="text"
                  className={styles.inputClass}
                  value={layer.id}
                  onChange={(e) => handleLayerChange(index, 'id', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={styles.labelClass}>Type:</label>
                <select
                  className={styles.selectClass}
                  value={layer.type}
                  onChange={(e) => handleLayerChange(index, 'type', e.target.value)}
                >
                  <option value="TEXT">Text</option>
                  <option value="IMAGE">Image</option>
                </select>
              </div>
              <div>
                <label className={styles.labelClass}>Description:</label>
                <input
                  type="text"
                  className={styles.inputClass}
                  value={layer.description}
                  onChange={(e) => handleLayerChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={() => deleteLayer(index)} className={styles.deleteButton}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" onClick={addLayer} className={`${styles['add-layer-btn']} ${styles.button}`}>
            + Add Layer
          </button>
        </div>
        <button type="submit" className={styles.button}>Register Template</button>
      </form>
      <Link href="/" className={`${styles.button} ${styles.ctas} ${styles.backLink}`}>← Back to Homepage</Link>
    </div>
  );
}
