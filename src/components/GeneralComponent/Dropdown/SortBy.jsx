import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { ChevronDownIcon, PlusIcon, MinusIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Best Rating", value: "rating" },
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "low-high" },
  { name: "Price: High to Low", value: "high-low" },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SortBy = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSortChange = (value) => {
    console.log("Selected sort option:", value);
  };

  return (
    <div className="">
      {/* Mobile Filter Dialog */}
      <Dialog open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} className="relative z-40">
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 w-80 bg-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={() => setMobileFiltersOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="mt-4">
            {filters.map((section) => (
              <Disclosure key={section.id}>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex justify-between w-full text-left py-2 border-b">
                      <span className="font-medium text-gray-700">{section.name}</span>
                      {open ? (
                        <MinusIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <PlusIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel>
                      <div className="mt-2">
                        {section.options.map((option) => (
                          <div key={option.value} className="flex items-center gap-2">
                            <input type="checkbox" id={option.value} name={section.id} />
                            <label htmlFor={option.value} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </DialogPanel>
      </Dialog>

      {/* Sort and Filter Controls */}
      <div className="flex justify-between items-centerh-10 border-[#A7D7FF] border-[1px] rounded-lg p-2">
        <Menu as="div" className="relative inline-block">
          <MenuButton className="text-sm font-medium text-gray-700 flex items-center gap-1">
            Sort
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          </MenuButton>
          <MenuItems className="absolute mt-2 bg-white shadow-lg rounded-lg">
            {sortOptions.map((option) => (
              <MenuItem key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => handleSortChange(option.value)}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {option.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <button
          className="flex items-center gap-1  text-gray-700 text-sm"
          onClick={() => setMobileFiltersOpen(true)}
        >
          {/* <FunnelIcon className=" w-5" /> */}
        </button>
      </div>
    </div>
  );
};

export default SortBy;
