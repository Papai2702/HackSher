import { motion } from "framer-motion";
import Button from "../UI/Button";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative h-64 rounded-xl overflow-hidden shadow-lg group`}
    >
      <div className="absolute inset-0 w-full h-full bg-[#2E4A56]">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/1C3B43/ABAFB5?text=${category.title.replace(/\s/g, "+")}`;
            e.target.className = "w-full h-full object-contain p-4 bg-[#1C3B43]";
          }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
        <span className="text-xs font-semibold text-[#ABAFB5] mb-1">{category.tag}</span>
        <h3 className="font-poppins text-2xl font-bold text-white mb-1">{category.title}</h3>
        <p className="text-[#ABAFB5] text-sm mb-4">{category.subtitle}</p>
        <div className="flex justify-between items-end">
          <Button
            variant="primary"
            size="sm"
          >
            Explore
          </Button>
          <span className="text-xs text-[#677E8A]">{category.products} products</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;