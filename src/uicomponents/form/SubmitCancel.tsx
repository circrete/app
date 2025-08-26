export const SubmitCancel = ({ onClose, isSubmitting }: { onClose?: () => void; isSubmitting: boolean }) => (
  <div className="flex-none flex justify-end space-x-3 pt-4 border-t">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {isSubmitting ? 'Saving...' : 'Save Changes'}
    </button>
  </div>
);
