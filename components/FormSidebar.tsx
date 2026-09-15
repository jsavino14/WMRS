import { DirectContact } from "./DirectContact";

export function FormSidebar() {
  return (
    <div>
      <DirectContact />
      <div className="mt-6 pt-6 border-t border-charcoal/10">
        <p className="label mb-3">What happens next</p>
        <p className="text-base text-charcoal/65 leading-relaxed">
          A person reads every submission, not a queue. We review what you send and come back with what we found. No commitment, no contract.
        </p>
      </div>
    </div>
  );
}
