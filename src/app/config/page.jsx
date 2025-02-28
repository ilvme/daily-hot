'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { platforms } from '../../config/platforms';
import BackToTop from '../../components/BackToTop.jsx';

function SortableItem({ id, name, title, icon, enabled, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    zIndex: transform ? 1 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full cursor-move"
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-8 h-8">
          <Image src={icon} alt={name} fill className="object-contain" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
      <div>
        <Switch
          checked={enabled}
          onChange={() => onToggle()}
          className={`${enabled ? 'bg-red-400 dark:bg-red-800' : 'bg-gray-200 dark:bg-gray-500'} relative inline-flex h-5 w-9 items-center rounded-full transition-colors`}
        >
          <span className="sr-only">启用 {name}</span>
          <span
            className={`${enabled ? 'translate-x-4' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default function ConfigPage() {
  const [items, setItems] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('platformConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        const updatedConfig = platforms.map((platform) => {
          const existingPlatform = parsedConfig.find((p) => p.id === platform.id);
          return existingPlatform || { ...platform, enabled: true };
        });
        setItems(updatedConfig);
        localStorage.setItem('platformConfig', JSON.stringify(updatedConfig));
      } else {
        const initialItems = platforms.map((platform) => ({
          ...platform,
          enabled: true,
        }));
        setItems(initialItems);
        localStorage.setItem('platformConfig', JSON.stringify(initialItems));
      }
    } catch (error) {
      console.error('Error loading platform config:', error);
      const initialItems = platforms.map((platform) => ({
        ...platform,
        enabled: true,
      }));
      setItems(initialItems);
      localStorage.setItem('platformConfig', JSON.stringify(initialItems));
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem('platformConfig', JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  const handleToggle = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      );
      localStorage.setItem('platformConfig', JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">平台配置</h1>
            <p className="text-amber-500 dark:text-amber-400 text-sm">
              网站配置功能开发中，功能尚不稳定
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            拖拽调整平台顺序，开关控制平台显示状态
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    title={item.title}
                    icon={item.icon}
                    enabled={item.enabled}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/*返回顶部*/}
      <BackToTop />
    </main>
  );
}
