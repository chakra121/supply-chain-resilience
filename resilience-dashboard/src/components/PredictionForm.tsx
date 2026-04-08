"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";

export default function PredictionForm({ onSubmit }: any) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    product_id: "",
    current_inventory: "",
    origin_country: "",
    destination_country: "",
    shipping_mode: "Standard Class",
    sustain_until_date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !form.title ||
      !form.product_id ||
      !form.current_inventory ||
      !form.origin_country ||
      !form.destination_country ||
      !form.sustain_until_date
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        ...form,
        product_id: Number(form.product_id),
        current_inventory: Number(form.current_inventory),
      });
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }

    setLoading(false);
  };

  return (
    <Card className="shadow-xl border border-gray-200">
      <CardBody className="space-y-5">

        {/* TITLE */}
        <Input
          label="Title"
          placeholder="e.g., Q1 Inventory Planning"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          isRequired
        />

        {/* DESCRIPTION */}
        <Input
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        {/* PRODUCT + INVENTORY */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Product ID"
            type="number"
            value={form.product_id}
            onChange={(e) => handleChange("product_id", e.target.value)}
            isRequired
          />

          <Input
            label="Current Inventory"
            type="number"
            value={form.current_inventory}
            onChange={(e) =>
              handleChange("current_inventory", e.target.value)
            }
            isRequired
          />
        </div>

        {/* COUNTRIES */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Origin Country"
            placeholder="e.g., India"
            value={form.origin_country}
            onChange={(e) =>
              handleChange("origin_country", e.target.value)
            }
            isRequired
          />

          <Input
            label="Destination Country"
            placeholder="e.g., Australia"
            value={form.destination_country}
            onChange={(e) =>
              handleChange("destination_country", e.target.value)
            }
            isRequired
          />
        </div>

        {/* SHIPPING MODE */}
        <Select
          label="Shipping Mode"
          selectedKeys={[form.shipping_mode]}
          onSelectionChange={(keys) =>
            handleChange("shipping_mode", Array.from(keys)[0])
          }
        >
          <SelectItem key="Standard Class">Standard Class</SelectItem>
          <SelectItem key="Second Class">Second Class</SelectItem>
          <SelectItem key="First Class">First Class</SelectItem>
          <SelectItem key="Same Day">Same Day</SelectItem>
        </Select>

        {/* DATE */}
        <Input
          type="date"
          label="Sustain Inventory Until"
          value={form.sustain_until_date}
          onChange={(e) =>
            handleChange("sustain_until_date", e.target.value)
          }
          isRequired
        />

        {/* SUBMIT BUTTON */}
        <Button
          color="primary"
          onPress={handleSubmit}
          isLoading={loading}
          className="w-full"
        >
          Run Prediction
        </Button>
      </CardBody>
    </Card>
  );
}