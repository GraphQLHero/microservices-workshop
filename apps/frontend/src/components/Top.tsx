'use client';
import { Text, List, ListItem, ProgressBar } from '@tremor/react';
import getFlagEmoji from '@/utils/getFlagEmoji';

export default function Top({
  items,
}: {
  items: { country: string; value: number; percentage: number }[];
}) {
  return (
    <List className="mt-4">
      {items.map((search) => (
        <ListItem key={search.country}>
          <div className="w-full">
            <Text>{getFlagEmoji(search.country)}</Text>
            <ProgressBar
              percentageValue={search.percentage}
              label={`${search.value}`}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
}
